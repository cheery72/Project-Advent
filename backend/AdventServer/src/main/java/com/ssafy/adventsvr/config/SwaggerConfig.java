package com.ssafy.authsvr.config;

import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

public class SwaggerConfig {

    /*
     * Swagger API 문서
     * */
    @Bean
    public Docket swaggerAPI() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(this.swaggerInfo())    // 스웨거 정보 등록
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .useDefaultResponseMessages(true);  // 기본 세팅되는 200, 401, 403, 404 표시
    }

    /*
     * Swagger 정보
     * */
    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder()
                .title("Make our special : 어드벤트 스페셜데이")
                .description("안녕하세요 어스입니다\n" +
                        "특별한 날을 기다리며 매일 매일 설레는 마음으로 언박싱하는 기분 느껴보고 싶지 않으신가요?\n" +
                        "소중한 날을 기념하여 자신 또는 가족, 친구, 지인, 연인분께 직접 꾸민 어드벤트 스페셜데이를 선물해보세요")
                .version("1.0.0")
                .build();
    }

}