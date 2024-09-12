package com.silverorder.domain.option.service;

import com.silverorder.domain.option.dto.OptionDto;
import com.silverorder.domain.option.dto.RequestOptionCategoryDto;
import com.silverorder.domain.option.dto.ResponseOptionDto;
import com.silverorder.domain.option.entity.OptionCategory;
import com.silverorder.domain.option.repository.OptionCategoryJpaRepository;
import com.silverorder.domain.option.repository.OptionRepository;
import com.silverorder.domain.store.entity.Store;
import com.silverorder.domain.store.repository.StoreJpaRepository;
import com.silverorder.domain.user.dto.UserRole;
import com.silverorder.domain.user.entity.User;
import com.silverorder.domain.user.repository.UserJpaRepository;
import com.silverorder.global.exception.CustomException;
import com.silverorder.global.exception.ErrorCode;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <pre>
 *      옵션 관리 서비스 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OptionServiceImpl implements OptionService{
    private final OptionRepository optionRepository;
    private final OptionCategoryJpaRepository optionCategoryJpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final StoreJpaRepository storeJpaRepository;


    /**
     * 옵션 카테고리 및 옵션 등록
     * @param userId : 유저 id
     * @param requestOptionCategoryDto : 옵션 등록 요소
     * @throws Exception
     */
    @Override
    @Transactional
    public void saveOptionCategory(long userId, RequestOptionCategoryDto requestOptionCategoryDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getUserRole() != UserRole.ROLE_ADMIN)
            throw new CustomException(ErrorCode.NOT_AUTHENTICATED);

        //가맹점 확인 로직
        Store store = storeJpaRepository.findById(requestOptionCategoryDto.getStoreId())
            .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        if(!store.getUser().equals(user))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);


        //카테고리 등록 및 리턴
        OptionCategory optionCategory = optionRepository.saveOptionCategory(store,
                requestOptionCategoryDto.getOptionCategoryTitle(),
                requestOptionCategoryDto.getOptionType());
        log.info("return optionCategoryId : {}", optionCategory.getId());

        // 옵션목록 존재 시
        if(requestOptionCategoryDto.getOptionDtoList() != null
                && !requestOptionCategoryDto.getOptionDtoList().isEmpty()) {
            // 옵션 등록
            optionRepository.saveOption(optionCategory, requestOptionCategoryDto.getOptionDtoList());
        }

    }


    /**
     * 옵션 카테고리 및 옵션 수정
     * @param userId : 유저 id
     * @param optionCategoryId : 옵션 카테고리 id
     * @param requestOptionCategoryDto : 옵션 등록 요소
     * @throws Exception
     */
    @Override
    @Transactional
    public void modifyOptionCategory(long userId, long optionCategoryId, RequestOptionCategoryDto requestOptionCategoryDto) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getUserRole() != UserRole.ROLE_ADMIN)
            throw new CustomException(ErrorCode.NOT_AUTHENTICATED);

        //가게 확인 로직
        Store store = storeJpaRepository.findById(requestOptionCategoryDto.getStoreId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        if(!store.getUser().equals(user))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);

        //옵션 카테고리 확인 로직
        OptionCategory optionCategory = optionCategoryJpaRepository.findById(optionCategoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.OPTION_CATEGORY_NOT_FOUND));

        //옵션 삭제 및 옵션 카테고리 수정
        optionRepository.modifyOptionCategory(optionCategory,
                requestOptionCategoryDto.getOptionCategoryTitle(),
                requestOptionCategoryDto.getOptionType());

        // 옵션목록 존재 시
        if(requestOptionCategoryDto.getOptionDtoList() != null
                && !requestOptionCategoryDto.getOptionDtoList().isEmpty()) {
            // 옵션 등록
            optionRepository.saveOption(optionCategory, requestOptionCategoryDto.getOptionDtoList());
        }
    }

    /**
     * 옵션 카테고리 삭제
     * @param userId : 유저 id
     * @param optionCategoryId : 옵션 카테고리 id
     * @throws Exception
     */
    @Override
    public void deleteOptionCategory(long userId, long optionCategoryId) throws Exception {
        //유저 확인 로직
        User user = userJpaRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(user.getUserRole() != UserRole.ROLE_ADMIN)
            throw new CustomException(ErrorCode.NOT_AUTHENTICATED);

        //옵션 카테고리 확인 로직
        OptionCategory optionCategory = optionCategoryJpaRepository.findById(optionCategoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.OPTION_CATEGORY_NOT_FOUND));

        //가게 확인 로직
        Store store = storeJpaRepository.findById(optionCategory.getStore().getId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        if(!store.getUser().equals(user))
            throw new CustomException(ErrorCode.STORE_NOT_AUTHENTICATED);

        //옵션 삭제 및 옵션 카테고리 수정
        optionRepository.deleteOptionCategory(optionCategory);
    }

    /**
     * 옵션 카테고리 리스트 조회
     * @param storeId : 가맹점 id
     * @throws Exception
     */
    @Override
    public List<ResponseOptionDto> listOptionCategory(long storeId) {
        // 가게 확인 로직
        Store store = storeJpaRepository.findById(storeId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        return optionRepository.listOptionCategory(store);
    }

    /**
     * 옵션 카테고리 상세 조회
     * @param optionCategoryId : 옵션 카테고리 id
     * @throws Exception
     */
    @Override
    public ResponseOptionDto detailOptionCategory(long optionCategoryId) throws Exception {
        // 카테고리 확인 로직
        OptionCategory optionCategory = optionCategoryJpaRepository
                .findById(optionCategoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.OPTION_CATEGORY_NOT_FOUND));

        ResponseOptionDto responseOptionDto = new ResponseOptionDto(
                optionCategory.getId(),
                optionCategory.getOptionCategoryTitle(),
                optionCategory.getOptionType(),
                null
        );

        responseOptionDto.setOptionDtoList(optionRepository.detailOptionCategory(optionCategory));
        return responseOptionDto;
    }
}
