package party.maker.dto;

public class PartyFile {
    String name;
    String path;
    int numberOfPlays;

    public PartyFile(String name, String path, int numberOfPlays) {
        this.name = name;
        this.path = path;
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

    public int getNumberOfPlays() {
        return numberOfPlays;
    }

    public void setNumberOfPlays(int numberOfPlays) {
        this.numberOfPlays = numberOfPlays;
    }
}
