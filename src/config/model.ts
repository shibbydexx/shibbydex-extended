const DEFAULT_CONFIG = { aliases: '', show_all: false }

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
    try {
      const aliases: Map<string, string> = new Map(JSON.parse(storage.aliases))
      return new Config(aliases, storage.show_all)
    } catch(error) {
      return new Config(new Map(), storage.show_all)
    }

  }

  static async saveConfig(newConfig: Config) {
    const newRawConfig = {
      aliases: JSON.stringify(Array.from(newConfig.aliases.entries())),
      show_all: newConfig.showAll
    }


    await browser.storage.local.set(newRawConfig)
    console.error('config saved')
    console.error(JSON.stringify(newRawConfig))
  }
}

export { Config }
