const currentMetrics = [
  {
    label: "Cảm giác như",
    value: "36°",
    note: "Nhiệt độ cảm nhận ở khu vực trung tâm",
  },
  {
    label: "Độ ẩm",
    value: "68%",
    note: "Không khí còn giữ ẩm sau buổi sáng",
  },
  {
    label: "Gió",
    value: "14 km/h",
    note: "Hướng đông nam, ổn định cho di chuyển",
  },
  {
    label: "Xác suất mưa",
    value: "18%",
    note: "Khả năng xuất hiện mưa rào nhẹ",
  },
] as const;

const hourlyForecast = [
  {
    time: "08:00",
    temp: "26°",
    rain: "5%",
    fill: "22%",
  },
  {
    time: "11:00",
    temp: "30°",
    rain: "12%",
    fill: "54%",
  },
  {
    time: "14:00",
    temp: "33°",
    rain: "18%",
    fill: "100%",
  },
  {
    time: "17:00",
    temp: "31°",
    rain: "24%",
    fill: "72%",
  },
  {
    time: "20:00",
    temp: "28°",
    rain: "10%",
    fill: "40%",
  },
] as const;

const dailyForecast = [
  {
    day: "T2",
    summary: "Nắng nhẹ",
    note: "Gió nam, trời khô",
    high: "32°",
    low: "26°",
  },
  {
    day: "T3",
    summary: "Mây rải rác",
    note: "Chiều dịu hơn",
    high: "33°",
    low: "26°",
  },
  {
    day: "T4",
    summary: "Mưa rào nhẹ",
    note: "Khả năng mưa buổi tối",
    high: "31°",
    low: "25°",
  },
  {
    day: "T5",
    summary: "Trời quang",
    note: "Ánh nắng rõ hơn",
    high: "30°",
    low: "25°",
  },
  {
    day: "T6",
    summary: "Nhiều mây",
    note: "Độ ẩm tăng",
    high: "29°",
    low: "24°",
  },
  {
    day: "T7",
    summary: "Nắng đan mây",
    note: "Ổn định cho cuối tuần",
    high: "30°",
    low: "24°",
  },
  {
    day: "CN",
    summary: "Dễ chịu",
    note: "Biến động thấp",
    high: "31°",
    low: "25°",
  },
] as const;

const releaseSignals = [
  {
    title: "Responsive gọn",
    detail: "Layout giữ nhịp tốt trên mobile, tablet và màn hình lớn.",
  },
  {
    title: "Dễ nối API",
    detail: "Mỗi cụm dữ liệu đã tách riêng để thay bằng nguồn thật sau này.",
  },
  {
    title: "Sẵn cho branding",
    detail: "Màu nền, thẻ và typography đã đi theo một hướng rõ ràng.",
  },
] as const;

const launchNotes = [
  {
    title: "SEO sẵn",
    detail: "Metadata và title đã được cấu hình cho trang gốc.",
  },
  {
    title: "Khung dữ liệu",
    detail: "Các khối hiển thị đã tách đủ để gắn dữ liệu vị trí.",
  },
  {
    title: "Giao diện ổn",
    detail: "Đủ tinh gọn để chốt bản phát hành đầu tiên.",
  },
] as const;

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[#edf5ff]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.26),transparent_38%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0))]" />
      <div className="absolute right-[-6rem] top-28 -z-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute left-[-5rem] top-72 -z-10 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <header className="mb-6 flex items-center justify-between gap-4 rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-sm font-semibold tracking-[0.25em] text-white shadow-lg shadow-slate-900/15">
              WF
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-500">
                WeatherForecast
              </p>
              <p className="font-display text-lg text-slate-950">
                Khung dự báo thời tiết
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Sẵn sàng phát hành bản đầu
          </div>
        </header>

        <div className="grid flex-1 gap-6 xl:grid-cols-[1.25fr_0.95fr]">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
            <div className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-sky-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                    Tổng quan hiện tại
                  </p>
                  <h1 className="mt-3 font-display text-4xl leading-none text-slate-950 sm:text-5xl lg:text-6xl">
                    TP. Hồ Chí Minh
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    Bộ khung giao diện cho trang dự báo: đủ gọn để phát hành bản đầu, đủ rõ để gắn dữ liệu thời tiết thật sau này.
                  </p>
                </div>

                <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-700">
                  Cập nhật 5 phút trước
                </div>
              </div>

              <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#0284c7_0%,#0891b2_55%,#2563eb_100%)] p-6 text-white shadow-[0_24px_50px_rgba(14,165,233,0.32)]">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                    Điều kiện hiện tại
                  </p>

                  <div className="mt-6 flex items-end gap-4">
                    <div className="font-display text-7xl leading-none sm:text-8xl">
                      31°
                    </div>
                    <div className="pb-2">
                      <p className="text-xl font-semibold">Nắng xen mây</p>
                      <p className="mt-1 text-sm text-white/85">
                        Gió nhẹ • Tầm nhìn 12 km
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                        Độ ẩm
                      </p>
                      <p className="mt-2 font-display text-2xl">68%</p>
                      <p className="mt-1 text-xs text-white/65">
                        Không khí còn giữ ẩm
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                        Tầm nhìn
                      </p>
                      <p className="mt-2 font-display text-2xl">12 km</p>
                      <p className="mt-1 text-xs text-white/65">
                        Phù hợp cho di chuyển
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-sky-50/90">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                      UV 7
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                      AQI 58
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                      Áp suất 1007 hPa
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {currentMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <p className="text-sm text-slate-500">{metric.label}</p>
                      <p className="mt-3 font-display text-3xl text-slate-950">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {metric.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="grid gap-6">
            <section className="rounded-[2rem] border border-slate-900/5 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                Khung phát hành
              </p>
              <h2 className="mt-3 font-display text-3xl text-white">
                Sẵn sàng gắn dữ liệu thật
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Mọi khối thông tin đã được tách rõ, giúp thay API, cache hay route mà không phải đụng toàn bộ trang.
              </p>

              <ul className="mt-6 space-y-3">
                {releaseSignals.map((signal) => (
                  <li
                    key={signal.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="font-medium text-white">{signal.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {signal.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Mốc quan trọng
              </p>
              <h2 className="mt-3 font-display text-2xl text-slate-950">
                Chuẩn bị cho bản phát hành đầu
              </h2>

              <div className="mt-6 grid gap-3">
                {launchNotes.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="font-medium text-slate-950">{note.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {note.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Dự báo theo giờ
                </p>
                <h2 className="mt-2 font-display text-2xl text-slate-950">
                  24 giờ tới
                </h2>
              </div>

              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">
                Kết cấu ổn định
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {hourlyForecast.map((slot) => (
                <div
                  key={slot.time}
                  className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <p className="text-sm font-medium text-slate-500">{slot.time}</p>
                  <p className="mt-4 font-display text-3xl text-slate-950">
                    {slot.temp}
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                      style={{ width: slot.fill }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Tỉ lệ mưa</span>
                    <span>{slot.rain}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Bảy ngày tới
                </p>
                <h2 className="mt-2 font-display text-2xl text-slate-950">
                  Xu hướng tuần
                </h2>
              </div>

              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                Độ tin cậy cao
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {dailyForecast.map((day) => (
                <div
                  key={day.day}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="font-display text-xl text-slate-900">
                    {day.day}
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">{day.summary}</p>
                    <p className="text-sm text-slate-500">{day.note}</p>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-sm text-slate-500">{day.low}</span>
                    <span className="font-display text-xl text-slate-950">
                      {day.high}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/70 px-5 py-4 text-sm text-slate-600 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          Khung này đã sẵn sàng để nối dữ liệu thật, thêm dự báo theo vị trí và mở rộng thành phiên bản phát hành.
        </footer>
      </div>
    </main>
  );
}
