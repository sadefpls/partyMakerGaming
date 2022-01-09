package party.maker.dto;

public class RenameFileDtoIn {
    String newName;
    String path;

    public RenameFileDtoIn(String newName, String path) {
        this.newName = newName;
        this.path = path;
    }

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
