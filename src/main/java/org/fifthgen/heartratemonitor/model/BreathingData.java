package org.fifthgen.heartratemonitor.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BreathingData {
    @JsonProperty("Timestamp")
    private String timestamp;
    @JsonProperty("Data")
    private double data;
}
