import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

export function SocialAvatars({ tip }: { tip: string }) {
  // Split tip into title and disclaimer if it contains parentheses
  const hasDisclaimer = tip.includes('(') && tip.includes(')');
  const title = hasDisclaimer ? tip.substring(0, tip.indexOf('(')).trim() : tip;
  const disclaimer = hasDisclaimer ? tip.substring(tip.indexOf('(')) : '';

  return (
    <div className="mx-auto mt-8 flex w-fit flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <p className="text-foreground text-center text-base font-medium">
          {title}
        </p>
        {disclaimer && (
          <p className="text-muted-foreground text-center text-xs font-normal max-w-md">
            {disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}
