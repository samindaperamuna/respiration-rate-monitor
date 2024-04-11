package org.fifthgen.heartratemonitor.api;

import lombok.extern.slf4j.Slf4j;
import org.fifthgen.heartratemonitor.service.SseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RequestMapping("/api/v1/")
@RestController
public class APIController {

    @Autowired
    private SseService sseService;

    @GetMapping(value = "/breathingRateSSE", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getBreathingRateSSE() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        sseService.addEmitter(emitter);

        return emitter;
    }
}
