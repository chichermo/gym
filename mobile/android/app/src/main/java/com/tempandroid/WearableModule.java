package com.tempandroid;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.fitness.Fitness;
import com.google.android.gms.fitness.FitnessOptions;
import com.google.android.gms.fitness.FitnessOptions.Builder;
import com.google.android.gms.fitness.data.DataSet;
import com.google.android.gms.fitness.data.DataSource;
import com.google.android.gms.fitness.data.DataType;
import com.google.android.gms.fitness.data.Field;
import com.google.android.gms.fitness.request.DataReadRequest;
import com.google.android.gms.fitness.result.DataReadResponse;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class WearableModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final String TAG = "WearableModule";
    private static final int REQUEST_OAUTH_REQUEST_CODE = 1001;
    private static final int REQUEST_GOOGLE_SIGN_IN = 1002;

    private final ReactApplicationContext reactContext;
    private GoogleSignInClient mGoogleSignInClient;
    private GoogleSignInAccount mGoogleSignInAccount;

    public WearableModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
        setupGoogleSignIn();
    }

    @Override
    public String getName() {
        return "WearableModule";
    }

    private void setupGoogleSignIn() {
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .requestScopes(new Scope("https://www.googleapis.com/auth/fitness.activity.read"))
                .requestScopes(new Scope("https://www.googleapis.com/auth/fitness.body.read"))
                .requestScopes(new Scope("https://www.googleapis.com/auth/fitness.location.read"))
                .requestScopes(new Scope("https://www.googleapis.com/auth/fitness.nutrition.read"))
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(reactContext, gso);
    }

    @ReactMethod
    public void isGoogleFitAvailable(Promise promise) {
        try {
            FitnessOptions fitnessOptions = Builder.builder()
                    .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
                    .addDataType(DataType.TYPE_HEART_RATE_BPM, FitnessOptions.ACCESS_READ)
                    .addDataType(DataType.TYPE_DISTANCE_DELTA, FitnessOptions.ACCESS_READ)
                    .addDataType(DataType.TYPE_CALORIES_EXPENDED, FitnessOptions.ACCESS_READ)
                    .build();

            boolean isAvailable = GoogleSignIn.hasPermissions(GoogleSignIn.getLastSignedInAccount(reactContext), fitnessOptions);
            promise.resolve(isAvailable);
        } catch (Exception e) {
            promise.reject("ERROR", "Error verificando disponibilidad de Google Fit", e);
        }
    }

    @ReactMethod
    public void requestGoogleFitPermissions(Promise promise) {
        try {
            FitnessOptions fitnessOptions = Builder.builder()
                    .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
                    .addDataType(DataType.TYPE_HEART_RATE_BPM, FitnessOptions.ACCESS_READ)
                    .addDataType(DataType.TYPE_DISTANCE_DELTA, FitnessOptions.ACCESS_READ)
                    .addDataType(DataType.TYPE_CALORIES_EXPENDED, FitnessOptions.ACCESS_READ)
                    .build();

            if (!GoogleSignIn.hasPermissions(GoogleSignIn.getLastSignedInAccount(reactContext), fitnessOptions)) {
                Intent intent = Fitness.getAccountPermissionIntent(reactContext, fitnessOptions);
                getCurrentActivity().startActivityForResult(intent, REQUEST_OAUTH_REQUEST_CODE);
                promise.resolve(false);
            } else {
                promise.resolve(true);
            }
        } catch (Exception e) {
            promise.reject("ERROR", "Error solicitando permisos de Google Fit", e);
        }
    }

    @ReactMethod
    public void signInToGoogleFit(Promise promise) {
        try {
            Intent signInIntent = mGoogleSignInClient.getSignInIntent();
            getCurrentActivity().startActivityForResult(signInIntent, REQUEST_GOOGLE_SIGN_IN);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", "Error iniciando sesión en Google Fit", e);
        }
    }

    @ReactMethod
    public void getStepCount(double startTime, double endTime, Promise promise) {
        try {
            Calendar cal = Calendar.getInstance();
            Date now = new Date();
            cal.setTime(now);
            long endTimeMs = cal.getTimeInMillis();
            cal.add(Calendar.DAY_OF_YEAR, -1);
            long startTimeMs = cal.getTimeInMillis();

            DataReadRequest readRequest = new DataReadRequest.Builder()
                    .read(DataType.TYPE_STEP_COUNT_DELTA)
                    .setTimeRange(startTimeMs, endTimeMs, TimeUnit.MILLISECONDS)
                    .build();

            Task<DataReadResponse> task = Fitness.getHistoryClient(reactContext, GoogleSignIn.getLastSignedInAccount(reactContext))
                    .readData(readRequest);

            task.addOnSuccessListener(new OnSuccessListener<DataReadResponse>() {
                @Override
                public void onSuccess(DataReadResponse dataReadResponse) {
                    int totalSteps = 0;
                    for (DataSet dataSet : dataReadResponse.getDataSets()) {
                        for (com.google.android.gms.fitness.data.DataPoint dp : dataSet.getDataPoints()) {
                            for (Field field : dp.getDataType().getFields()) {
                                int steps = dp.getValue(field).asInt();
                                totalSteps += steps;
                            }
                        }
                    }
                    promise.resolve(totalSteps);
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    promise.reject("ERROR", "Error obteniendo pasos", e);
                }
            });
        } catch (Exception e) {
            promise.reject("ERROR", "Error configurando lectura de pasos", e);
        }
    }

    @ReactMethod
    public void getHeartRateData(double startTime, double endTime, Promise promise) {
        try {
            Calendar cal = Calendar.getInstance();
            Date now = new Date();
            cal.setTime(now);
            long endTimeMs = cal.getTimeInMillis();
            cal.add(Calendar.HOUR_OF_DAY, -24);
            long startTimeMs = cal.getTimeInMillis();

            DataReadRequest readRequest = new DataReadRequest.Builder()
                    .read(DataType.TYPE_HEART_RATE_BPM)
                    .setTimeRange(startTimeMs, endTimeMs, TimeUnit.MILLISECONDS)
                    .build();

            Task<DataReadResponse> task = Fitness.getHistoryClient(reactContext, GoogleSignIn.getLastSignedInAccount(reactContext))
                    .readData(readRequest);

            task.addOnSuccessListener(new OnSuccessListener<DataReadResponse>() {
                @Override
                public void onSuccess(DataReadResponse dataReadResponse) {
                    WritableArray heartRateData = Arguments.createArray();
                    for (DataSet dataSet : dataReadResponse.getDataSets()) {
                        for (com.google.android.gms.fitness.data.DataPoint dp : dataSet.getDataPoints()) {
                            WritableMap dataPoint = Arguments.createMap();
                            dataPoint.putDouble("value", dp.getValue(Field.FIELD_BPM).asFloat());
                            dataPoint.putDouble("startTime", dp.getStartTime(TimeUnit.MILLISECONDS));
                            dataPoint.putDouble("endTime", dp.getEndTime(TimeUnit.MILLISECONDS));
                            heartRateData.pushMap(dataPoint);
                        }
                    }
                    promise.resolve(heartRateData);
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    promise.reject("ERROR", "Error obteniendo frecuencia cardíaca", e);
                }
            });
        } catch (Exception e) {
            promise.reject("ERROR", "Error configurando lectura de frecuencia cardíaca", e);
        }
    }

    @ReactMethod
    public void getCaloriesData(double startTime, double endTime, Promise promise) {
        try {
            Calendar cal = Calendar.getInstance();
            Date now = new Date();
            cal.setTime(now);
            long endTimeMs = cal.getTimeInMillis();
            cal.add(Calendar.DAY_OF_YEAR, -1);
            long startTimeMs = cal.getTimeInMillis();

            DataReadRequest readRequest = new DataReadRequest.Builder()
                    .read(DataType.TYPE_CALORIES_EXPENDED)
                    .setTimeRange(startTimeMs, endTimeMs, TimeUnit.MILLISECONDS)
                    .build();

            Task<DataReadResponse> task = Fitness.getHistoryClient(reactContext, GoogleSignIn.getLastSignedInAccount(reactContext))
                    .readData(readRequest);

            task.addOnSuccessListener(new OnSuccessListener<DataReadResponse>() {
                @Override
                public void onSuccess(DataReadResponse dataReadResponse) {
                    float totalCalories = 0;
                    for (DataSet dataSet : dataReadResponse.getDataSets()) {
                        for (com.google.android.gms.fitness.data.DataPoint dp : dataSet.getDataPoints()) {
                            float calories = dp.getValue(Field.FIELD_CALORIES).asFloat();
                            totalCalories += calories;
                        }
                    }
                    promise.resolve((int) totalCalories);
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    promise.reject("ERROR", "Error obteniendo calorías", e);
                }
            });
        } catch (Exception e) {
            promise.reject("ERROR", "Error configurando lectura de calorías", e);
        }
    }

    @ReactMethod
    public void getDistanceData(double startTime, double endTime, Promise promise) {
        try {
            Calendar cal = Calendar.getInstance();
            Date now = new Date();
            cal.setTime(now);
            long endTimeMs = cal.getTimeInMillis();
            cal.add(Calendar.DAY_OF_YEAR, -1);
            long startTimeMs = cal.getTimeInMillis();

            DataReadRequest readRequest = new DataReadRequest.Builder()
                    .read(DataType.TYPE_DISTANCE_DELTA)
                    .setTimeRange(startTimeMs, endTimeMs, TimeUnit.MILLISECONDS)
                    .build();

            Task<DataReadResponse> task = Fitness.getHistoryClient(reactContext, GoogleSignIn.getLastSignedInAccount(reactContext))
                    .readData(readRequest);

            task.addOnSuccessListener(new OnSuccessListener<DataReadResponse>() {
                @Override
                public void onSuccess(DataReadResponse dataReadResponse) {
                    float totalDistance = 0;
                    for (DataSet dataSet : dataReadResponse.getDataSets()) {
                        for (com.google.android.gms.fitness.data.DataPoint dp : dataSet.getDataPoints()) {
                            float distance = dp.getValue(Field.FIELD_DISTANCE).asFloat();
                            totalDistance += distance;
                        }
                    }
                    promise.resolve(totalDistance);
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    promise.reject("ERROR", "Error obteniendo distancia", e);
                }
            });
        } catch (Exception e) {
            promise.reject("ERROR", "Error configurando lectura de distancia", e);
        }
    }

    @ReactMethod
    public void signOut(Promise promise) {
        try {
            mGoogleSignInClient.signOut();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", "Error cerrando sesión", e);
        }
    }

    @ReactMethod
    public void revokeAccess(Promise promise) {
        try {
            mGoogleSignInClient.revokeAccess();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", "Error revocando acceso", e);
        }
    }

    // Event Emitters
    private void sendEvent(String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_OAUTH_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                Log.i(TAG, "Permisos de Google Fit concedidos");
                WritableMap event = Arguments.createMap();
                event.putString("status", "permissions_granted");
                sendEvent("googleFitPermissionsResult", event);
            } else {
                Log.e(TAG, "Permisos de Google Fit denegados");
                WritableMap event = Arguments.createMap();
                event.putString("status", "permissions_denied");
                sendEvent("googleFitPermissionsResult", event);
            }
        } else if (requestCode == REQUEST_GOOGLE_SIGN_IN) {
            if (resultCode == Activity.RESULT_OK) {
                Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
                try {
                    mGoogleSignInAccount = task.getResult();
                    Log.i(TAG, "Sesión iniciada en Google Fit");
                    WritableMap event = Arguments.createMap();
                    event.putString("status", "signed_in");
                    event.putString("email", mGoogleSignInAccount.getEmail());
                    sendEvent("googleSignInResult", event);
                } catch (Exception e) {
                    Log.e(TAG, "Error iniciando sesión en Google Fit", e);
                    WritableMap event = Arguments.createMap();
                    event.putString("status", "sign_in_failed");
                    event.putString("error", e.getMessage());
                    sendEvent("googleSignInResult", event);
                }
            } else {
                Log.e(TAG, "Inicio de sesión cancelado");
                WritableMap event = Arguments.createMap();
                event.putString("status", "sign_in_cancelled");
                sendEvent("googleSignInResult", event);
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        // No se necesita implementar para este módulo
    }
} 