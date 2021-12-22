package party.maker.dto;

public class PartyFile {
    String name;
    String path;
    boolean isFile; //TODO why is it .file on frontend?
    int numberOfPlays;

    public PartyFile(String name, String path, boolean isFile, int numberOfPlays) {
        this.name = name;
        this.path = path;
        this.isFile = isFile;
        this.numberOfPlays = numberOfPlays;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public boolean isFile() {
        return isFile;
    }

    public void setFile(boolean file) {
        isFile = file;
    }

    public int getNumberOfPlays() {
        return numberOfPlays;
    }

    public void setNumberOfPlays(int numberOfPlays) {
        this.numberOfPlays = numberOfPlays;
    }
}
