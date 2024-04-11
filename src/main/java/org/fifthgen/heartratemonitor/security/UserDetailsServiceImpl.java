package org.fifthgen.heartratemonitor.security;

import lombok.extern.slf4j.Slf4j;
import org.fifthgen.heartratemonitor.model.UserInfo;
import org.fifthgen.heartratemonitor.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.security.core.userdetails.UserDetailsService;

@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userInfo = userRepository.findByUsername(username);

        if (userInfo == null) {
            log.error("Username not found");

            throw new UsernameNotFoundException("No valid user found!");
        }

        log.info("User authenticated successfully!");

        return new CustomUserDetails(userInfo);
    }
}
