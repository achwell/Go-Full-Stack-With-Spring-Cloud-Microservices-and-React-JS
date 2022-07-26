package com.sha.springbootmicroservice3apigateway.service;

import com.sha.springbootmicroservice3apigateway.model.User;

public interface AuthenticationService {
    User signInAndReturnJWT(User signInRequest);
}
