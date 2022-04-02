package party.maker.dto;


import org.springframework.web.multipart.MultipartFile;

public class UploadFileDtoIn {
    String path;
    MultipartFile file;

    public UploadFileDtoIn(String path, MultipartFile file) {
        this.path = path;
        this.file = file;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
