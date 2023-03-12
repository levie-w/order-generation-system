package backend.util;

import com.google.common.collect.Lists;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class AlgorithmUtils {
    private static SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    public static int[] splitInteger(int sum, int n, boolean allowZero) {
        // 随机抽取n-1个小于sum的数
        List<Integer> list = Lists.newArrayList();

        // 将0和sum加入到里list中
        list.add(0);

        // 判断生成的正整数集合中是否允许为0，true元素可以为0  false元素不可以为0
        if (!allowZero) {
            sum = sum - n;
        }

        list.add(sum);
        int temp = 0;
        for (int i = 0; i < n - 1 ; i++) {
            temp = (int) (Math.random() * sum);
            list.add(temp);
        }

        Collections.sort(list);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = list.get(i + 1) - list.get(i);
            if (!allowZero) {
                nums[i] += 1;
            }
        }

        return nums;
    }

    public static String getRandomDate(String startDateStr, String endDateStr) throws ParseException {
        Random random = new Random();
        Calendar calendar = Calendar.getInstance();
        Date endDate = DATE_FORMAT.parse(endDateStr);
        calendar.setTime(endDate);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        long after = calendar.getTime().getTime();

        Date startDate = DATE_FORMAT.parse(startDateStr);
        long before = startDate.getTime();

        long randomDate = (long) (before + (random.nextFloat() * (after - before + 1) ));
        return DATE_FORMAT.format(randomDate);
    }

    public static List<String> getRandomDates(String startDate, String endDate, int num) throws ParseException {
        List<String> dates = Lists.newArrayListWithCapacity(num);

        for (int i = 0; i < num; i++) {
            String randomDate = getRandomDate(startDate, endDate);
            dates.add(randomDate);
        }

        Collections.sort(dates);
        return dates;
    }
}
