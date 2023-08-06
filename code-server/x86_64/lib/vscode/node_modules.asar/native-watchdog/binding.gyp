{
  "targets": [
    {
      "target_name": "watchdog",
      "sources": [ "src/watchdog.cc" ],
      'msvs_settings': {
        'VCCLCompilerTool': {
          'AdditionalOptions': [
            '/Qspectre',
            '/guard:cf'
          ]
        },
        'VCLinkerTool': {
          'AdditionalOptions': [
            '/guard:cf'
          ]
        }
      }
    }
  ]
}
