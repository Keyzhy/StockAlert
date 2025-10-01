import TradingViewWidget from "@/components/TradingViewWidget";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <TradingViewWidget
          title="Symbol Info"
          scriptUrl={`${scriptUrl}symbol-info.js`}
          config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          title="Candle Chart"
          scriptUrl={`${scriptUrl}advanced-chart.js`}
          config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          title="Baseline Chart"
          scriptUrl={`${scriptUrl}advanced-chart.js`}
          config={BASELINE_WIDGET_CONFIG(symbol)}
        />
      </div>

      <div className="space-y-6">
        <div className="watchlist-btn-placeholder">
          {/* WatchlistButton placeholder - component needs to be created */}
        </div>
        <TradingViewWidget
          title="Technical Analysis"
          scriptUrl={`${scriptUrl}technical-analysis.js`}
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          title="Company Profile"
          scriptUrl={`${scriptUrl}symbol-profile.js`}
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
        />
        <TradingViewWidget
          title="Company Financials"
          scriptUrl={`${scriptUrl}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
        />
      </div>
    </div>
  );
}
