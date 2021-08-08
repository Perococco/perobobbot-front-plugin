package perobobbot.plugin.dashboard;

import com.google.common.collect.ImmutableList;
import jplugman.annotation.Extension;
import lombok.NonNull;
import perobobbot.plugin.ResourceLocation;
import perobobbot.plugin.ViewInfo;
import perobobbot.plugin.WebPlugin;

@Extension(point = WebPlugin.class, version = "1.0.0")
public class FrontEndConfig implements WebPlugin {

    public static final String CONTEXT = "/front";
    public static final String ASSETS = "/assets";

    @Override
    public @NonNull ImmutableList<ViewInfo> getViewInformation() {
        return ImmutableList.of(
                new ViewInfo(CONTEXT, "redirect:" + CONTEXT + "/index.html"),
                new ViewInfo(CONTEXT + "/", "redirect:" + CONTEXT + "/index.html")
        );
    }

    @Override
    public @NonNull ImmutableList<ResourceLocation> getResourceLocations() {
        return ImmutableList.of(
                ResourceLocation.with(CONTEXT+"/**", "classpath:/dashboard-vue/public/")
//                ResourceLocation.with(ASSETS+"/**", "classpath:/dashboard-vue/public/front/assets/")

        );
    }

    @Override
    public @NonNull ClassLoader resourceClassLoader() {
        return FrontEndConfig.class.getClassLoader();
    }

    @Override
    public @NonNull String getName() {
        return "Vue FrontEnd";
    }
}
