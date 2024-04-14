package org.fifthgen.heartratemonitor.api;

import lombok.extern.slf4j.Slf4j;
import org.fifthgen.heartratemonitor.model.BreathingData;
import org.fifthgen.heartratemonitor.model.RequestDTO;
import org.fifthgen.heartratemonitor.model.RespirationRate;
import org.fifthgen.heartratemonitor.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RequestMapping("/api/v1/")
@RestController
public class APIController {

    @Autowired
    private DataService dataService;

    private static final String DATA_FILE = "data/data{}.json";
    private static final String RESP_FILE = "data/respRate{}.json";

    private static final int EMIT_RATE = 25;

    @PostMapping(value = "/breathingData", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BreathingData> getBreathingData(@RequestBody RequestDTO requestDTO) {
        List<BreathingData> breathingDataList = new ArrayList<>();

        if (requestDTO != null) {
            breathingDataList = dataService.readBreathingData(DATA_FILE.replace("{}", Integer.toString(requestDTO.getFileNo())));
        }

        return breathingDataList;
    }

    @PostMapping(value = "/breathingDataSSE", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getBreathingDataSSE(@RequestBody RequestDTO requestDTO) {
        SseEmitter emitter = new SseEmitter();

        if (requestDTO != null) {
            emitData(emitter, DATA_FILE.replace("{}", Integer.toString(requestDTO.getFileNo())));
        }

        return emitter;
    }

    @PostMapping(value = "/respirationRate", produces = MediaType.APPLICATION_JSON_VALUE)
    public RespirationRate getRespirationRate(@RequestBody RequestDTO requestDTO) {
        return dataService.readRespirationRate(RESP_FILE.replace("{}", Integer.toString(requestDTO.getFileNo())));
    }

    private void emitData(SseEmitter emitter, String dataFile) {
        List<BreathingData> breathingRateDataList = dataService.readBreathingData(dataFile);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            for (BreathingData breathingRateData : breathingRateDataList) {
                try {
                    emitter.send(breathingRateData);
                    Thread.sleep(EMIT_RATE);
                } catch (IOException e) {
                    log.error("Failed to emit data: {}", e.getLocalizedMessage());
                } catch (InterruptedException e) {
                    log.error("Thread interrupted: {}", e.getLocalizedMessage());
                }
            }

            emitter.complete();
        });
    }
}
