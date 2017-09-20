package aliyun.oss.demo.util;

import aliyun.oss.demo.exception.RequestToMapException;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class StringUtil {

	public static boolean isBlank(String str) {
		int strLen;
		if (str == null || (strLen = str.length()) == 0) {
			return true;
		}
		for (int i = 0; i < strLen; i++) {
			if ((Character.isWhitespace(str.charAt(i)) == false)) {
				return false;
			}
		}
		return true;
	}

	public static boolean isNotBlank(String str) {
		return !isBlank(str);
	}
	
	public static boolean isNull(String str){
		if(str == null)
			return true;
		return false;
	}
	
	public static boolean isNotNull(String str){
		return !isNull(str);
	}

	/**
	 * 判断字符串是否只包含空格或为null
	 * @param in 源字串
	 * @return 判断结果
	 */
	public static boolean isOnlySpacesOrNull(String in){
		return in==null||in.trim().length()==0;
	}
	
	public static Map<String, Object> resquestParameter2Map(HttpServletRequest request) throws RequestToMapException {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String[]> url = request.getParameterMap();
		for (Entry<String, String[]> entry : url.entrySet()) {
			String key = entry.getKey();
			String[] valueArray = entry.getValue();
			String value;
			value = new String(valueArray[0]);
			map.put(key, value);
		}
		return map;
	}
	
}
