package com.concretepage.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class HRUtils {
	
	private final static DecimalFormat df = new DecimalFormat("#.#");
	
	public static long createAUniqueId(String userId) {
		return DateUtils.getDateinYYYYMMDD() + userId.hashCode();
	}
	
	public static Float roundToSingleDecimal(Float value) {
		 Double doubleValue = (new BigDecimal(value).setScale(1, BigDecimal.ROUND_HALF_DOWN).doubleValue());
		 return doubleValue.floatValue();
	}
	

}
