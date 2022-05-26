package com.ssafy.adventsvr.advents;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.adventsvr.config.QuerydslConfig;
import com.ssafy.adventsvr.controller.AdventController;
import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.payload.response.AdventUrlReceiveResponse;
import com.ssafy.adventsvr.repository.AdventBoxRepository;
import com.ssafy.adventsvr.repository.AdventRepository;
import com.ssafy.adventsvr.service.AdventService;
import com.ssafy.adventsvr.service.AdventServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith({SpringExtension.class})
@MockBean(JpaMetamodelMappingContext.class)
@WebMvcTest(AdventController.class)
public class AdventControllerTest {

//    @Mock
//    private AdventRepository adventRepository;
//
//    @Mock
//    private AdventBoxRepository adventBoxRepository;
//
    @MockBean
    private AdventService adventService;

//    @InjectMocks
//    private AdventController adventController;

    @Autowired
    MockMvc mockMvc;

//    private String url = "5828d1072f364f0c94fb4a0919ea396a";

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void adventDayInput_SUCESS_TEST() throws Exception{
        AdventDayResponse adventDayResponse = AdventDayResponse.builder()
                                                .adventId("asdf")
                                                .build();

        AdventDayRequest adventDayRequest = new AdventDayRequest(123,1);
        given(adventService.inputDayAdvent(adventDayRequest)).willReturn(adventDayResponse);

        String content = objectMapper.writeValueAsString(new AdventDayRequest(123,3));
//        when(adventService.inputDayAdvent(anyLong()))
//                .thenReturn(content);
        mockMvc.perform(post("/advents")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(print());
//                .andExpect((ResultMatcher) content().string(equalTo("asdf")));
    }

}
