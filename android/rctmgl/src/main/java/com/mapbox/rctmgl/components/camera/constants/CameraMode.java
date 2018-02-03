package com.mapbox.rctmgl.components.camera.constants;

import android.support.annotation.IntDef;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Created by nickitaliano on 9/6/17.
 */

public class CameraMode {

    @IntDef({ FLIGHT, EASE, NONE })
    @Retention(RetentionPolicy.SOURCE)
    public @interface Mode {}

    public static final int FLIGHT = 1;
    public static final int EASE = 2;
    public static final int NONE = 3;
}
