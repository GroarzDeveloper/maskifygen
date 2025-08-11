import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

function buildMask({
  type,
  angle,
  start,
  end,
  invert,
  shape,
  posX,
  posY,
  bothSides,
}: {
  type: "linear" | "radial";
  angle: number;
  start: number;
  end: number;
  invert: boolean;
  shape: "circle" | "ellipse";
  posX: number;
  posY: number;
  bothSides: boolean;
}) {
  const from = invert ? "black" : "transparent";
  const to = invert ? "transparent" : "black";

  if (type === "linear") {
    if (bothSides) {
      return `linear-gradient(${angle}deg, ${from} 0%, ${to} ${start}%, ${to} ${end}%, ${from} 100%)`;
    }
    return `linear-gradient(${angle}deg, ${from} ${start}%, ${to} ${end}%)`;
  }
  // radial
  return `radial-gradient(${shape} at ${posX}% ${posY}%, ${from} ${start}%, ${to} ${end}%)`;
}

export default function MaskGenerator() {
  const { toast } = useToast();
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [invert, setInvert] = useState(false);
  const [bothSides, setBothSides] = useState(false);
  const [shape, setShape] = useState<"circle" | "ellipse">("circle");
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [repeat, setRepeat] = useState<"no-repeat" | "repeat" | "round" | "space">("no-repeat");
  const [size, setSize] = useState<"auto" | "cover" | "contain">("auto");

  const maskImage = useMemo(
    () =>
      buildMask({ type, angle, start, end, invert, shape, posX, posY, bothSides }),
    [type, angle, start, end, invert, shape, posX, posY, bothSides]
  );

  const css = useMemo(() => {
    return `/* Paste into your CSS */\n.my-masked-element {\n  -webkit-mask-image: ${maskImage};\n  mask-image: ${maskImage};\n  mask-repeat: ${repeat};\n  mask-size: ${size};\n  mask-position: ${posX}% ${posY}%;\n}`;
  }, [maskImage, repeat, size, posX, posY]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(css);
    toast({
      title: "CSS copied",
      description: "Your mask-image CSS has been copied to the clipboard.",
    });
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-start">
        <Card className="order-2 md:order-1">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as any)}>
                  <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear gradient</SelectItem>
                    <SelectItem value="radial">Radial gradient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {type === "radial" && (
                <div className="space-y-2">
                  <Label htmlFor="shape">Shape</Label>
                  <Select value={shape} onValueChange={(v) => setShape(v as any)}>
                    <SelectTrigger id="shape"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="ellipse">Ellipse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label>Start stop: {start}%</Label>
                <Slider value={[start]} min={0} max={100} step={1} onValueChange={([v]) => setStart(v)} />
              </div>
              <div className="space-y-2">
                <Label>End stop: {end}%</Label>
                <Slider value={[end]} min={0} max={100} step={1} onValueChange={([v]) => setEnd(v)} />
              </div>
              {type === "linear" && (
                <div className="space-y-2 sm:col-span-2">
                  <Label>Angle: {angle}°</Label>
                  <Slider value={[angle]} min={0} max={360} step={1} onValueChange={([v]) => setAngle(v)} />
                </div>
              )}
              {type === "radial" && (
                <>
                  <div className="space-y-2">
                    <Label>Position X: {posX}%</Label>
                    <Slider value={[posX]} min={0} max={100} step={1} onValueChange={([v]) => setPosX(v)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Position Y: {posY}%</Label>
                    <Slider value={[posY]} min={0} max={100} step={1} onValueChange={([v]) => setPosY(v)} />
                  </div>
                </>
              )}
              <div className="flex items-center justify-between sm:col-span-2">
                <div className="space-y-1">
                  <Label htmlFor="invert">Invert mask</Label>
                  <p className="text-sm text-muted-foreground">Swap transparent and opaque stops</p>
                </div>
                <Switch id="invert" checked={invert} onCheckedChange={setInvert} />
              </div>
              {type === "linear" && (
                <div className="flex items-center justify-between sm:col-span-2">
                  <div className="space-y-1">
                    <Label htmlFor="bothSides">Mask both sides</Label>
                    <p className="text-sm text-muted-foreground">Opaque middle, transparent edges</p>
                  </div>
                  <Switch id="bothSides" checked={bothSides} onCheckedChange={setBothSides} />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="repeat">Repeat</Label>
                <Select value={repeat} onValueChange={(v) => setRepeat(v as any)}>
                  <SelectTrigger id="repeat"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-repeat">no-repeat</SelectItem>
                    <SelectItem value="repeat">repeat</SelectItem>
                    <SelectItem value="round">round</SelectItem>
                    <SelectItem value="space">space</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select value={size} onValueChange={(v) => setSize(v as any)}>
                  <SelectTrigger id="size"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">auto</SelectItem>
                    <SelectItem value="cover">cover</SelectItem>
                    <SelectItem value="contain">contain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="css">Generated CSS</Label>
              <div className="relative">
                <Textarea id="css" readOnly value={css} className="font-mono text-xs leading-snug min-h-[140px] pr-28" />
                <Button onClick={handleCopy} className="absolute right-1 top-1 h-8">Copy</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 md:order-2">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="checkerboard rounded-lg border p-4">
              <div
                className="mx-auto aspect-[4/3] w-full max-w-xl rounded-md border bg-foreground/80 transition-transform will-change-transform hover:scale-[1.01]"
                style={{
                  WebkitMaskImage: maskImage as any,
                  maskImage: maskImage as any,
                  maskRepeat: repeat,
                  maskSize: size,
                  maskPosition: `${posX}% ${posY}%`,
                }}
                aria-label="Preview box with current mask"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
