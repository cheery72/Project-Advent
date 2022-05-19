package com.ssafy.gatewaysvr.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    public AuthorizationHeaderFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange, "Not Found authorization Header", HttpStatus.UNAUTHORIZED);
            }

            log.info("AuthorizationHeaderFilter filter: request id -> {}", request.getId());

            return chain.filter(exchange)
                    .then(Mono.fromRunnable(() -> {
                        log.info("AuthorizationHeaderFilter filter: response code -> {}", response.getStatusCode());
                    }));
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String e, HttpStatus status){
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);

        return response.setComplete();
    }

    public static class Config {

    }
}

