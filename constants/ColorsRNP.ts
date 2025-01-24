import { MD3LightTheme as DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightThemeRNP = {
    ...DefaultTheme.colors,
    "colors": {
      "primary": "rgb(13, 71, 161)", //cambiado
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(240, 219, 255)",
      "onPrimaryContainer": "rgb(44, 0, 81)",
      "secondary": "rgb(25, 118, 210)", //cambiado
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(237, 221, 246)",
      "onSecondaryContainer": "rgb(33, 24, 42)",
      "tertiary": "rgb(128, 81, 88)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 217, 221)",
      "onTertiaryContainer": "rgb(50, 16, 23)",
      "error": "rgb(186, 26, 26)",
      "success":"rgb(40, 167, 69)",
      "warning":"rgb(255, 165, 0)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(29, 27, 30)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(29, 27, 30)",
      "surfaceVariant": "rgb(240, 248, 255)", //cambiado
      "onSurfaceVariant": "rgb(74, 69, 78)",
      "outline": "rgb(124, 117, 126)",
      "outlineVariant": "rgb(204, 196, 206)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(50, 47, 51)",
      "inverseOnSurface": "rgb(245, 239, 244)",
      "inversePrimary": "rgb(220, 184, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(251, 253, 255)", //cambiado
        "level2": "rgb(244, 236, 248)",
        "level3": "rgb(240, 231, 246)",
        "level4": "rgb(239, 229, 245)",
        "level5": "rgb(236, 226, 243)"
      },
      "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
      "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
      "backdrop": "rgba(51, 47, 55, 0.4)"
    }
  }

export const DarkThemeRNP = {
    ...MD3DarkTheme.colors,
    "colors": {
      "primary": "rgb(179, 229, 252)", //cambiado
      "onPrimary": "rgb(13, 71, 161)", //cambiado
      "primaryContainer": "rgb(95, 43, 146)",
      "onPrimaryContainer": "rgb(240, 219, 255)",
      "secondary": "rgb(129, 212, 250)", //cambiado
      "onSecondary": "rgb(54, 44, 63)",
      "secondaryContainer": "rgb(77, 67, 87)",
      "onSecondaryContainer": "rgb(237, 221, 246)",
      "tertiary": "rgb(243, 183, 190)",
      "onTertiary": "rgb(75, 37, 43)",
      "tertiaryContainer": "rgb(101, 58, 65)",
      "onTertiaryContainer": "rgb(255, 217, 221)",
      "error": "rgb(255, 180, 171)",
      "success":"rgb(255, 140, 0)",
      "warning":"rgb(50, 205, 50)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "#",
      "onBackground": "rgb(231, 225, 229)",
      "surface": "rgb(29, 27, 30)",
      "onSurface": "rgb(231, 225, 229)",
      "surfaceVariant": "rgb(74, 69, 78)", //cambiado
      "onSurfaceVariant": "rgb(204, 196, 206)",
      "outline": "rgb(150, 142, 152)",
      "outlineVariant": "rgb(74, 69, 78)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(231, 225, 229)",
      "inverseOnSurface": "rgb(50, 47, 51)",
      "inversePrimary": "rgb(120, 69, 172)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(39, 35, 41)",
        "level2": "rgb(44, 40, 48)",
        "level3": "rgb(50, 44, 55)",
        "level4": "rgb(52, 46, 57)",
        "level5": "rgb(56, 49, 62)"
      },
      "surfaceDisabled": "rgba(231, 225, 229, 0.12)",
      "onSurfaceDisabled": "rgba(231, 225, 229, 0.38)",
      "backdrop": "rgba(51, 47, 55, 0.4)"
    }
  }