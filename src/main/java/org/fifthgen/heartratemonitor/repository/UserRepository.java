package org.fifthgen.heartratemonitor.repository;

import org.fifthgen.heartratemonitor.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Long> {

    public UserInfo findByUsername(String username);
}
