package org.fifthgen.heartratemonitor.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeartRateData {
    private String timestamp;
    private double data;
}
