package party.maker.dto;

public class RankingItem {
    private String champion;
    private int timesPlayed;
    private String path;

    public RankingItem(String champion, int timesPlayed, String path) {
        this.champion = champion;
        this.timesPlayed = timesPlayed;
        this.path = path;
    }

    public String getChampion() {
        return champion;
    }

    public void setChampion(String champion) {
        this.champion = champion;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getTimesPlayed() {
        return timesPlayed;
    }

    public void setTimesPlayed(int timesPlayed) {
        this.timesPlayed = timesPlayed;
    }
}
