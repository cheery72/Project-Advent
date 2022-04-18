//package com.ssafy.adventsvr.advents;
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ssafy.adventsvr.controller.AdventController;
//import com.ssafy.adventsvr.payload.request.AdventDayRequest;
//import com.ssafy.adventsvr.payload.response.AdventDayResponse;
//import com.ssafy.adventsvr.service.AdventService;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.WebApplicationType;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
//@AutoConfigureMockMvc
//@ActiveProfiles("test")
//@AutoConfigureRestDocs
//public class AdventControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @MockBean
//    private AdventService adventService;
//
//    @Test
//    public void adventDayInput_SUCCESS_TEST() throws Exception{
//        // given
//        String content = objectMapper.writeValueAsString(new AdventDayRequest(1,1));
//
//        // when
//        String expectByAdventId = "$.[?(@.adventId == '%s')]";
//
//        // then
//        mockMvc.perform(post("/")
//                                        .content(content)
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath(expectByAdventId,1).exists());
//
//    }
//
//}
