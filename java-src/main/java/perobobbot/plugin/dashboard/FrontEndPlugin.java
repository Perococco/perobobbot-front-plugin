package perobobbot.plugin.dashboard;

import jplugman.annotation.Extension;
import lombok.Getter;
import lombok.NonNull;
import perobobbot.plugin.PerobobbotPlugin;
import perobobbot.plugin.WebPluginData;

@Extension(point = PerobobbotPlugin.class, version = "1.0.0")
public class FrontEndPlugin implements PerobobbotPlugin {

    @Getter
    private final WebPluginData data;

    public FrontEndPlugin() {
        this.data = new WebPluginData(
                FrontEndConfig.VIEW_INFORMATION,
                FrontEndConfig.RESOURCE_LOCATIONS,
                FrontEndConfig.class.getClassLoader()
        );
    }

    @Override
    public @NonNull String getName() {
        return "Front";
    }

}
