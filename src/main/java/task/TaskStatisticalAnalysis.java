package task;

import java.util.Arrays;
import java.util.DoubleSummaryStatistics;
import java.util.List;


public class TaskStatisticalAnalysis extends TaskImpl {
    @Override
    public void execute() {
        List<Double> numbers = Arrays.stream(input.split(","))
                .map(String::trim)
                .map(Double::parseDouble)
                .toList();

        DoubleSummaryStatistics stats = numbers.stream()
                .mapToDouble(Double::doubleValue)
                .summaryStatistics();

        double mean = stats.getAverage();

        //  variance
        double variance = numbers.stream()
                .mapToDouble(num -> Math.pow(num - mean, 2))
                .average()
                .orElse(0.0);

        //  standard deviation
        double stdDev = Math.sqrt(variance);

        //  median
        List<Double> sorted = numbers.stream()
                .sorted()
                .toList();
        double median = sorted.size() % 2 == 0 ?
                (sorted.get(sorted.size() / 2) + sorted.get(sorted.size() / 2 - 1)) / 2 :
                sorted.get(sorted.size() / 2);

        result = String.format("%n" +
                "Statistical Analysis:%n" +
                        "Mean: %.2f%n" +
                        "Median: %.2f%n" +
                        "Variance: %.2f%n" +
                        "Standard Deviation: %.2f%n" +
                        "Range: %.2f%n" +
                        "Sample Size: %d",
                mean,
                median,
                variance,
                stdDev,
                stats.getMax() - stats.getMin(),
                stats.getCount()
        );
    }
}
