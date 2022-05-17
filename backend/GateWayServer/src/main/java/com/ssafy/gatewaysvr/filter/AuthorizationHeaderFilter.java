package com.ssafy.gatewaysvr.filter;

import com.ctc.wstx.util.StringUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import java.security.Key;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    public AuthorizationHeaderFilter(){
        super(Config.class);
    }

    public static final String BEARER_PREFIX = "[Bearer ";

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {
            // exchange 객체로 request, response를 받는다.
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

//            String jwt = null;
//            String bearerToken = String.valueOf(request.getHeaders().get(HttpHeaders.AUTHORIZATION));
//
//            if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
//                jwt = bearerToken.substring(7);
//            }
//            try {
//                Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(jwt);
//            } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//                log.info("잘못된 JWT 서명입니다.");
//            } catch (ExpiredJwtException e) {
//                log.info("만료된 JWT 토큰입니다.");
//            } catch (UnsupportedJwtException e) {
//                log.info("지원되지 않는 JWT 토큰입니다.");
//            } catch (IllegalArgumentException e) {
//                log.info("JWT 토큰이 잘못되었습니다.");
//            }

            if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange, "Not Found authorization Header", HttpStatus.UNAUTHORIZED);
            }

            log.info("AuthorizationHeaderFilter filter: request id -> {}", request.getId());

            // chain에다가 postfilter: exchange 추가
            // 비동기방식으로 단일값 추가히기 위해서 Mono: 웹 플럭스 타입으로 추가
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

