package org.fifthgen.heartratemonitor.api;

import org.fifthgen.heartratemonitor.security.JwtService;
import org.fifthgen.heartratemonitor.security.model.AuthRequestDTO;
import org.fifthgen.heartratemonitor.security.model.JwtResponseDTO;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.remote.JMXAuthenticator;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    JwtService jwtService;

    @GetMapping("/login")
    public JwtResponseDTO authenticateUser(@RequestBody AuthRequestDTO authRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword())
        );

        if (authentication.isAuthenticated()) {
            return JwtResponseDTO.builder()
                    .accessToken(jwtService.GenerateToken(authRequestDTO.getUsername()))
                    .build();
        } else {
            throw new UsernameNotFoundException("Invalid username / username not found");
        }
    }
}
