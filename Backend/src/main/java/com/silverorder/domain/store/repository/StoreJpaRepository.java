package com.silverorder.domain.store.repository;

import com.silverorder.domain.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreJpaRepository extends JpaRepository<Store, Long> {
}
