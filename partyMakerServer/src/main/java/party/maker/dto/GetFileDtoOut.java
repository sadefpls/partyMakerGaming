package party.maker.dto;

public class GetFileDtoOut {
    String extension;
    String fileName;
    byte[] payload;

    public GetFileDtoOut(String extension, String fileName, byte[] payload) {
        this.extension = extension;
        this.fileName = fileName;
        this.payload = payload;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getPayload() {
        return payload;
    }

    public void setPayload(byte[] payload) {
        this.payload = payload;
    }
}
