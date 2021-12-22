package party.maker.abl;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;
import party.maker.dto.ListFilesDtoOut;
import party.maker.dto.PartyFile;
import party.maker.dto.GetFileDtoOut;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
            convertedFiles.add(new PartyFile(file.getName(), file.getPath(), file.isFile(), 0));
        }
        return convertedFiles;
    }

    public GetFileDtoOut getFile(String path) {
        try {
            Path requestPath = Paths.get(path);
            byte[] payload = Files.readAllBytes(requestPath);
            return new GetFileDtoOut(FilenameUtils.getExtension(path),requestPath.getFileName().toString(),payload);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public byte[] getFileFucked(String path) {
        try {
            Path requestPath = Paths.get(path);
            return Files.readAllBytes(requestPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
