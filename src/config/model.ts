const DEFAULT_CONFIG = { aliases: {}, show_all: false }

class Config {
  // map of slug to alias
  readonly aliases: Map<string, string>
  readonly showAll: boolean


  constructor(aliases: Map<string, string>, showAll: boolean) {
    this.aliases = aliases
    this.showAll = showAll
  }

  getTagAlias(slug: string): string | undefined {
    return this.aliases.get(slug)
  }

  static async loadConfig(): Promise<Config> {
    const storage = await browser.storage.local.get(DEFAULT_CONFIG)
    return new Config(storage.aliases, storage.show_all)
  }

  static async saveConfig(newConfig: Config) {
    const newRawConfig = {
      aliases: newConfig.aliases,
      show_all: newConfig.showAll
    }


    await browser.storage.local.set(newRawConfig)
  }
}

export { Config }
