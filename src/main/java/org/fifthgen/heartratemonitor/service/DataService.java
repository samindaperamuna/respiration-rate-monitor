package org.fifthgen.heartratemonitor.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.fifthgen.heartratemonitor.model.BreathingData;
import org.fifthgen.heartratemonitor.model.RespirationRate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class DataService {

    private SimpleDateFormat formatter = new SimpleDateFormat("EE MMM d y H:m:s ZZZ");

    public List<BreathingData> readBreathingData(String jsonFile) {
        ObjectMapper mapper = new ObjectMapper();
        List<BreathingData> breathingDataList = new ArrayList<>();

        try {
            File file = new ClassPathResource(jsonFile).getFile();
            breathingDataList = mapper.readValue(file, new TypeReference<List<BreathingData>>() {
            });
        } catch (IOException e) {
            log.error("Failed to read breathing data file: {}", e.getLocalizedMessage());
        }

        return breathingDataList;
    }

    public RespirationRate readRespirationRate(String jsonFile) {
        ObjectMapper mapper = new ObjectMapper();
        RespirationRate respirationRate = null;

        try {
            File file = new ClassPathResource(jsonFile).getFile();
            respirationRate = mapper.readValue(file, RespirationRate.class);
        } catch (IOException e) {
            log.error("Failed to read respiration rate file: {}", e.getLocalizedMessage());
        }

        return respirationRate;
    }

    private BreathingData produceHeartBeat() {
        double min = 0.0;
        double max = 0.8;
        Random random = new Random();

        return new BreathingData(formatter.format(new Date()),
                min + (max - min) * random.nextDouble()
        );
    }
}
