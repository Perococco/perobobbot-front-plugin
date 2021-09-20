package perobobbot.plugin.dashboard;

import com.google.common.collect.ImmutableSet;
import jplugman.api.Plugin;
import jplugman.api.Requirement;
import jplugman.api.ServiceProvider;
import jplugman.api.Version;
import lombok.NonNull;
import perobobbot.plugin.PerobobbotPlugin;

public class JPlugin implements Plugin {

    private static final Version VERSION = Version.with("1.0.0");

    @Override
    public @NonNull ImmutableSet<Requirement<?>> getRequirements() {
        return ImmutableSet.of();
    }

    @Override
    public @NonNull Class<?> getServiceClass() {
        return PerobobbotPlugin.class;
    }

    @Override
    public @NonNull Object loadService(@NonNull ModuleLayer pluginLayer, @NonNull ServiceProvider serviceProvider) {
        return new FrontEndPlugin();
    }
}
