package aliyun.oss.demo.exception;

import aliyun.oss.demo.exception.base.BaseException;

public class JsonConvertFailedException extends BaseException {
	private static final long serialVersionUID = -7257315519804301492L;
	
	public JsonConvertFailedException(Throwable t) {
		super(t);
	}

	@Override
	public String getErrorCode() {
		return "500";
	}

}
