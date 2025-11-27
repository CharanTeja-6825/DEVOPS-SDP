package com.klef.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface AdminRepository extends JpaRepository<Admin, String>{
	Admin findByUsernameAndPassword(String username, String password);
}
