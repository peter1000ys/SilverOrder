package com.silverorder.domain.option.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.silverorder.domain.menu.entity.Menu;
import com.silverorder.domain.option.dto.OptionDto;
import com.silverorder.domain.option.dto.OptionType;
import com.silverorder.domain.option.dto.ResponseOptionDto;
import com.silverorder.domain.option.entity.Option;
import com.silverorder.domain.option.entity.OptionCategory;
import com.silverorder.domain.store.entity.Store;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.silverorder.domain.option.entity.QOption.option;
import static com.silverorder.domain.option.entity.QOptionCategory.optionCategory;

/**
 * <pre>
 *      옵션 관리 레포지토리 구현
 * </pre>
 * @author 노명환
 * @since JDK17
 */
@Repository
@RequiredArgsConstructor
public class OptionRepositoryImpl implements OptionRepository{

    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;


    /**
     * 옵션 카테고리 신규 등록
     * <pre>
     *      가맹점에서 사용할 옵션의 카테고리를 등록한다.
     * </pre>
     * @param store : 가맹점 정보 entity
     * @param optionCategoryTitle : 옵션 카테고리 제목
     * @param optionType : 옵션 카테고리 타입(1 : radio / 2 : checkbox)
     * @return : 옵션 카테고리 entity
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public OptionCategory saveOptionCategory(Store store, String optionCategoryTitle, OptionType optionType) throws PersistenceException {
        try {
            OptionCategory optionCategory = new OptionCategory(
                    null,
                    store,
                    optionCategoryTitle,
                    optionType
            );

            em.persist(optionCategory);
            em.flush();

            //카테고리 등록 후 id 리턴
            return optionCategory;
        } catch(Exception e){
            throw new PersistenceException("옵션 카테고리 등록 중 에러 발생", e);
        }
    }

    /**
     * 옵션 카테고리 수정
     * <pre>
     *      가맹점에서 사용할 옵션의 카테고리를 수정한다.
     * </pre>
     * @param modOptionCategory :
     * @param optionCategoryTitle : 옵션 카테고리 제목
     * @param optionType : 옵션 카테고리 타입(1 : radio / 2 : checkbox)
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void modifyOptionCategory(OptionCategory modOptionCategory, String optionCategoryTitle, OptionType optionType) throws PersistenceException {
        try {
            // 카테고리에서 사용중인 옵션 삭제
            queryFactory
                    .delete(option)
                    .where(option.optionCategory.eq(modOptionCategory))
                    .execute();

            // 카테고리 수정
            queryFactory
                    .update(optionCategory)
                    .set(optionCategory.optionCategoryTitle, optionCategoryTitle)
                    .set(optionCategory.optionType, optionType)
                    .where(optionCategory.id.eq(modOptionCategory.getId()))
                    .execute();

        } catch(Exception e){
            throw new PersistenceException("옵션 카테고리 수정 중 에러 발생", e);
        }
    }

    /**
     * 옵션 카테고리 삭제
     * <pre>
     *      옵션 카테고리와 카테고리에 속한 옵션들을 삭제한다.
     * </pre>
     * @param delOptionCategory : 옵션 카테고리 정보
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void deleteOptionCategory(OptionCategory delOptionCategory) throws PersistenceException {
        try {
            // 카테고리에서 사용중인 옵션 삭제
            queryFactory
                    .delete(option)
                    .where(option.optionCategory.eq(delOptionCategory))
                    .execute();

            // 카테고리 삭제
            queryFactory
                    .delete(optionCategory)
                    .where(optionCategory.id.eq(delOptionCategory.getId()))
                    .execute();

        } catch(Exception e){
            throw new PersistenceException("옵션 카테고리 수정 중 에러 발생", e);
        }
    }

    /**
     * 옵션 등록
     * <pre>
     *      옵션 카테고리에서 사용할 옵션들을 등록한다.
     *      카테고리 등록, 수정 시 사용된다.
     * </pre>
     * @param optionCategory : 옵션 카테고리 entity
     * @param optionDtoList : 옵션 정보 리스트
     * @throws PersistenceException : JPA 표준 예외
     */
    @Override
    public void saveOption(OptionCategory optionCategory, List<OptionDto> optionDtoList) throws PersistenceException {
        try {
            for (OptionDto options : optionDtoList) {
                Option option = new Option(
                        null,
                        optionCategory,
                        options.getOptionName(),
                        options.getOptionPrice()
                );
                em.persist(option);
            }

            em.flush();
        } catch(Exception e){
            throw new PersistenceException("옵션 등록 중 에러 발생", e);
        }
    }

    /**
     * 옵션 카테고리 리스트 조회
     * <pre>
     *      가맹점에서 사용하는 옵션 카테고리를 조회한다.
     * </pre>
     * @param store : 가맹점 entity
     * @throws PersistenceException : JPA 표준 예외
     * @return 옵션 카테고리 Dto 리스트
     */
    @Override
    public List<ResponseOptionDto> listOptionCategory(Store store) throws PersistenceException {
        try{
            return queryFactory
                    .select(Projections.constructor(ResponseOptionDto.class,
                            optionCategory.id,
                            optionCategory.optionCategoryTitle,
                            optionCategory.optionType
                    ))
                    .from(optionCategory)
                    .where(optionCategory.store.eq(store))
                    //.orderBy()
                    //.limit()
                    .fetch();
        }catch(Exception e) {
            throw new PersistenceException("옵션 카테고리 조회 중 에러 발생", e);
        }
    }

    /**
     * 옵션 카테고리 리스트 조회
     * <pre>
     *      옵션 카테고리에서 사용되는 옵션들을 조회한다.
     * </pre>
     * @param optionCategory : 옵션 카테고리 entity
     * @throws PersistenceException : JPA 표준 예외
     * @return 옵션 카테고리 Dto 리스트
     */
    @Override
    public List<OptionDto> detailOptionCategory(OptionCategory optionCategory) throws PersistenceException {
        try{
            return queryFactory
                    .select(Projections.constructor(OptionDto.class,
                            option.id,
                            option.optionName,
                            option.optionPrice
                    ))
                    .from(option)
                    .where(option.optionCategory.eq(optionCategory))
                    .orderBy(option.optionPrice.asc())
                    .fetch();
        }catch(Exception e) {
            throw new PersistenceException("옵션 카테고리 조회 중 에러 발생", e);
        }
    }
}
