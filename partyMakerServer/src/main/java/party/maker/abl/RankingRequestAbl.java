package party.maker.abl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import party.maker.dto.RankingItem;
import party.maker.dto.SetRankingItemDtoIn;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;

@Component
public class RankingRequestAbl {
    public static final String RANKINGS_PATH = "rankings.json";

    @Autowired
    private ObjectMapper objectMapper;

    public List<RankingItem> listRanking() {
        return null;
    }

    public void setRankingItem(SetRankingItemDtoIn dtoIn) {
        List<RankingItem> rankings = new LinkedList<>();
        try {
            rankings = getRankings();
        } catch (IOException e) {
            e.printStackTrace();
        }
        rankings.add(new RankingItem(dtoIn.getChampion(), 0, dtoIn.getPath()));
        try {
            saveRankings(rankings);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    private List<RankingItem> getRankings() throws IOException {
        try (InputStream reader = Files.newInputStream(Path.of(RANKINGS_PATH))) {
            return objectMapper.readValue(reader.readAllBytes(), List.class);
        }
    }

    private void saveRankings(List<RankingItem> rankings) throws JsonProcessingException {
        String rankingsJson = objectMapper.writeValueAsString(rankings);
        try (FileWriter fw = new FileWriter(RANKINGS_PATH)) {
            fw.write(rankingsJson);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
