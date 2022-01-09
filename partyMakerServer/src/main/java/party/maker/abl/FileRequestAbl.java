package party.maker.abl;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import party.maker.dto.GetFileDtoOut;
import party.maker.dto.ListFilesDtoOut;
import party.maker.dto.PartyFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
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
            return new GetFileDtoOut(FilenameUtils.getExtension(path), requestPath.getFileName().toString(), payload);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<ByteArrayResource> getFileFucked(String path) {
        try {
            Path requestPath = Paths.get(path);
            ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(requestPath));
            return ResponseEntity.ok().body(resource);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ListFilesDtoOut renameFile(String newName, String path) {
        try {
            newName = newName.replaceAll("\"", "");
            String newFullName = getPath(path) + newName;
            File file = new File(path);
            newFullName += "." + FilenameUtils.getExtension(path);
            File newFile = new File(newFullName);
            file.renameTo(newFile);
            return listFiles(getPath(path));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getPath(String path) {
        String[] fracturedPath = path.split("\\\\");
        String[] folder = Arrays.copyOf(fracturedPath, fracturedPath.length - 1);
        String newFullName = String.join("\\", folder);
        return newFullName += "\\";
    }

    public ListFilesDtoOut deleteFile(String path) {
        File file = new File(path);
        file.delete();
        return listFiles(getPath(path));
    }
}
