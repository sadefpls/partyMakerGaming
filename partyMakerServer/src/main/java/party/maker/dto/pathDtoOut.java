package party.maker.dto;

import java.util.List;

public class pathDtoOut {
    String queriedPath;
    List<PartyFile> files;

    public pathDtoOut(String queriedPath, List<PartyFile> files) {
        this.queriedPath = queriedPath;
        this.files = files;
    }

    public String getQueriedPath() {
        return queriedPath;
    }

    public void setQueriedPath(String queriedPath) {
        this.queriedPath = queriedPath;
    }

    public List<PartyFile> getFiles() {
        return files;
    }

    public void setFiles(List<PartyFile> files) {
        this.files = files;
    }
}
