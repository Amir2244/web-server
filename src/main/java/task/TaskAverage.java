package task;

import java.util.Arrays;
import java.util.DoubleSummaryStatistics;

public class TaskAverage extends TaskImpl {
    @Override
    public void execute() {
        // find average, max, min
        DoubleSummaryStatistics stats = Arrays.stream(input.split(","))
                .mapToDouble(s -> Double.parseDouble(s.trim()))
                .summaryStatistics();

        result = String.format("%n" +
                        "Average Calculator:%n" +
                        "Average: %.2f%n" +
                        "Maximum: %.2f%n" +
                        "Minimum: %.2f",
                stats.getAverage(),
                stats.getMax(),
                stats.getMin());
    }
}
