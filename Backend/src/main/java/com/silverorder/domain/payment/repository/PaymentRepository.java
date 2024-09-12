package com.silverorder.domain.payment.repository;

import com.silverorder.domain.payment.dto.ResponsePayCardDto;
import com.silverorder.domain.user.entity.User;
import jakarta.persistence.PersistenceException;

import java.util.List;

public interface PaymentRepository {
    List<ResponsePayCardDto> myPayCardList(User user) throws PersistenceException;

}
