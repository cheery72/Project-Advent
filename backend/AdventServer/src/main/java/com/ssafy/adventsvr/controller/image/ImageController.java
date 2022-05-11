package com.ssafy.adventsvr.controller.image;


import com.ssafy.adventsvr.service.image.BackgroundService;
import com.ssafy.adventsvr.service.image.StickerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/images")
public class ImageController {

    private final StickerService stickerService;
    private final BackgroundService backgroundService;

//    @PostMapping("/stickers")
//    public void stickerInput(@RequestPart List<MultipartFile> files) {
//        stickerService.inputImage(files);
//    }
//
//    @PostMapping("/backgrounds")
//    public void backgroundInput(@RequestPart List<MultipartFile> files) {
//        backgroundService.inputImage(files);
//    }

    @GetMapping("/stickers")
    public ResponseEntity<Map<String,List<String>>> stickerFind(){
        log.info("stickerFind");

        return ResponseEntity
                .ok(stickerService.findImage());
    }

    @GetMapping("/backgrounds")
    public ResponseEntity<Map<String,List<String>>> backgroundFind(){
        log.info("backgroundFind");

        return ResponseEntity
                .ok(backgroundService.findImage());
    }

}
