package org.fifthgen.heartratemonitor.service;

import org.fifthgen.heartratemonitor.model.HeartRateData;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SseService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private SimpleDateFormat formatter = new SimpleDateFormat("EE MMM d y H:m:s ZZZ");

    public void addEmitter(SseEmitter emitter) {
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
    }

    @Scheduled(fixedRate = 25)
    public void sendEvents() {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(produceHeartBeat());
            } catch (IOException e) {
                emitter.complete();
                emitters.remove(emitter);
            }
        }
    }

    private HeartRateData produceHeartBeat() {
        double min = 0.0;
        double max = 0.8;
        Random random = new Random();

        return new HeartRateData(formatter.format(new Date()),
                min + (max - min) * random.nextDouble()
        );
    }
}
