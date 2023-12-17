declare module 'react-native-config' {
  export interface NativeConfig {
    RIJKS_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
