package party.maker.abl;

import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;
import party.maker.dto.ListFilesDtoOut;
import party.maker.dto.PartyFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class FileRequestAbl {
    String defaultPath;

    public ListFilesDtoOut listFiles(String path) {
        File dir = path != null ? new File(path) : new File(new FileSystemResource("").getFile().getAbsolutePath());
        List<PartyFile> files = dir.listFiles() != null ? convertFiles(Objects.requireNonNull(dir.listFiles())) : new ArrayList<>();
        return new ListFilesDtoOut(dir.getPath(), files);
    }

    private List<PartyFile> convertFiles(File[] files) {
        List<PartyFile> convertedFiles = new ArrayList<>();
        for (File file : files) {
            convertedFiles.add(new PartyFile(file.getName(), file.getPath(), 0));
        }
        return convertedFiles;
    }
}
