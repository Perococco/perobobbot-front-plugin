package perobobbot.plugin.dashboard;

import com.google.common.collect.ImmutableList;
import perobobbot.plugin.ResourceLocation;
import perobobbot.plugin.ViewInfo;

public class FrontEndConfig {

    public static final String CONTEXT = "/front";
    public static final String ASSETS = "/assets";

    public static final ImmutableList<ViewInfo> VIEW_INFORMATION = ImmutableList.of(
            new ViewInfo(CONTEXT, "redirect:" + CONTEXT + "/index.html"),
            new ViewInfo(CONTEXT + "/", "redirect:" + CONTEXT + "/index.html")
    );

    public static final ImmutableList<ResourceLocation> RESOURCE_LOCATIONS = ImmutableList.of(
            ResourceLocation.with(CONTEXT + "/**", "classpath:/dashboard-vue/public/")
    );

}
