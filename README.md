# Natalia Segura App (Nutrimind)

Mobile app built with **Vue 3 + Quasar + Capacitor** for iOS and Android.

- **Application ID** (Android + iOS): `org.nutrimind.app`
- **Backend API**: defined in [quasar.config.js](quasar.config.js) (`build.env.API`)

---

## Prerequisites

| Tool | Notes |
|---|---|
| [Node.js](https://nodejs.org/) 18 or 20 | Use [nvm](https://github.com/nvm-sh/nvm) (Mac/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) |
| [Android Studio](https://developer.android.com/studio) | Bundles JDK 21 — no need to install Java separately |
| Git | |
| Xcode (macOS only) | Required for iOS builds. Not available on Windows/Linux. |

---

## Setup on a new machine

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd app-nutri

# Root deps (Vue/Quasar)
npm install

# Capacitor deps (native plugins)
cd src-capacitor && npm install && cd ..
```

> **Windows users**: enable long paths first — see [Troubleshooting](#troubleshooting).

### 2. Configure `JAVA_HOME`

Gradle needs `JAVA_HOME` pointing at the JDK that ships with Android Studio.

**macOS (zsh)** — add to `~/.zshrc`:

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
```

Reload: `source ~/.zshrc`

**Windows (PowerShell, run once)**:

```powershell
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
$existing = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$env:JAVA_HOME\bin;$existing", "User")
```

Then **close and reopen** any open terminal / Android Studio so they pick it up.

Verify:

```bash
java -version
# Should report: openjdk version "21.x..."
```

### 3. Obtain the release keystore

The Android signing keystore (`nutrimind-release.keystore`) is **not in the repo** (gitignored). You need to get it from the project owner via a secure channel:

- 1Password / Bitwarden attachment (recommended)
- AirDrop (Mac ↔ Mac)
- GPG-encrypted file: `gpg --symmetric --cipher-algo AES256 nutrimind-release.keystore`

Place it at:

```
src-capacitor/android/app/nutrimind-release.keystore
```

> **NEVER** send the keystore via plain email, Slack, Discord, public Gist, or any unencrypted channel.
> **NEVER** commit it to git. Losing it means you can no longer publish updates to Play Store.

### 4. Create `keystore.properties`

Copy the template:

**macOS / Linux**:
```bash
cp src-capacitor/android/keystore.properties.example src-capacitor/android/keystore.properties
```

**Windows (PowerShell)**:
```powershell
Copy-Item src-capacitor\android\keystore.properties.example src-capacitor\android\keystore.properties
```

Edit `src-capacitor/android/keystore.properties` and fill in the real values (ask the owner):

```properties
storeFile=nutrimind-release.keystore
storePassword=<store password>
keyAlias=nutrimind
keyPassword=<key password>
```

This file is gitignored — passwords stay on your machine.

### 5. Verify the signing config

```bash
cd src-capacitor/android

# macOS / Linux
./gradlew :app:signingReport

# Windows
.\gradlew.bat :app:signingReport
```

Look for the `Variant: release` block — it should show your keystore path, alias `nutrimind`, and SHA1 / SHA256 fingerprints.

- *"Keystore was tampered with, or password was incorrect"* → fix `keystore.properties`
- *Permission denied* (Mac/Linux) → `chmod +x src-capacitor/android/gradlew`

---

## Development (hot-reload)

```bash
# Browser
npx quasar dev

# Android device/emulator with hot reload, opens Android Studio
npx quasar dev -m capacitor -T android --ide
```

---

## Production build

### Android (for Play Store)

```bash
# One-time icon regen (only if logo_app.png changes)
npm i -g @quasar/icongenie
npm run icons

# Build SPA → sync Capacitor → open Android Studio
npx quasar build -m capacitor -T android --ide
```

In Android Studio:

1. **Build → Generate Signed App Bundle / APK**
2. Select **Android App Bundle**
3. Pick the `release` variant
4. Gradle uses `signingConfigs.release` from `keystore.properties` — no need to re-enter credentials
5. Output: `src-capacitor/android/app/release/app-release.aab` — upload this to Play Console

Before each release, bump `versionCode` and `versionName` in [src-capacitor/android/app/build.gradle](src-capacitor/android/app/build.gradle).

### iOS (for App Store, **macOS only**)

```bash
npx quasar build -m capacitor -T ios --ide
```

In Xcode: **Product → Archive → Distribute App**.

---

## Troubleshooting

### Windows: enable long paths

Default 260-char limit can break `node_modules` installs.

```powershell
# PowerShell as Administrator, once
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

Reboot.

### Windows: antivirus slowing builds

Add these to Windows Defender exclusions:
- The project folder
- `%USERPROFILE%\.gradle`
- `%USERPROFILE%\.android`
- `%USERPROFILE%\AppData\Local\Android`

### macOS: `gradlew` permission denied

```bash
chmod +x src-capacitor/android/gradlew
```

### Out of memory when running an emulator

Android emulator + Android Studio + Docker can saturate 16 GB RAM machines.

- Stop Docker: `docker stop $(docker ps -q)`
- Use a lighter AVD (e.g. Pixel 4 + Android 11 instead of Pixel 10 + 14)
- Or skip the emulator entirely — connect a physical Android via USB with debugging enabled. Much faster.

### `cap sync` complains about missing `./www`

`cap sync` is normally driven by `quasar build`. If you really need to run it standalone:

```bash
# Either build first
npx quasar build -m capacitor -T android

# Or create a placeholder
mkdir -p src-capacitor/www && echo "<!DOCTYPE html>" > src-capacitor/www/index.html
```

---

## Project structure

```
.
├── src/                   # Vue/Quasar app (pages, services, stores)
├── public/                # Static assets + favicons
├── quasar.config.js       # Quasar config (API URL, plugins, build targets)
├── logo_app.png           # Source icon for icongenie
└── src-capacitor/         # Capacitor wrapper
    ├── capacitor.config.json
    ├── android/
    │   ├── app/
    │   │   ├── nutrimind-release.keystore  # NOT in git
    │   │   └── build.gradle
    │   └── keystore.properties             # NOT in git
    └── ios/
        └── App/
```

---

## Files that must NEVER be committed

- `*.keystore`, `*.jks` — Android signing keys
- `keystore.properties` — keystore passwords
- `node_modules/`, `dist/`, build artifacts

All covered by [.gitignore](.gitignore).

---

## References

- [Quasar config](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)
- [Capacitor config](https://capacitorjs.com/docs/config)
- [Google Play Console](https://play.google.com/console)
