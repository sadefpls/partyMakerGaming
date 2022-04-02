package party.maker.helper;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import party.maker.dto.Champion;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Component
public class ChampionDataHelper {

    public static final String CHAMPIONS_PATH = "champions2.json";
    public static final String RANKINGS_PATH = "rankings.json";
    @Autowired
    private ObjectMapper objectMapper;

    public List<Champion> getNewData() throws IOException {
        URL url = new URL("https://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json");
        HttpURLConnection http = (HttpURLConnection) url.openConnection();
        http.setRequestProperty("Accept", "*/*");
        byte[] bytes = http.getInputStream().readAllBytes();
        Path filepath = Path.of("champions.json");

        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Champion> listChampions() {
        try (InputStream reader = Files.newInputStream(Path.of(CHAMPIONS_PATH))) {
            return objectMapper.readValue(reader.readAllBytes(), List.class);
        } catch (IOException e) {
            return null;
        }
    }
}